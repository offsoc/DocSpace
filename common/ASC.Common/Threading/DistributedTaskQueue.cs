// (c) Copyright Ascensio System SIA 2010-2022
//
// This program is a free software product.
// You can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
// Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
// to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
// any third-party rights.
//
// This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
// the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
//
// You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
//
// The  interactive user interfaces in modified source and object code versions of the Program must
// display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
//
// Pursuant to Section 7(b) of the License you must retain the original Product logo when
// distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
// trademark law for use of our trademarks.
//
// All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
// content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
// International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode

namespace ASC.Common.Threading;

[Singletone]
public class DistributedTaskCacheNotify
{
    public ConcurrentDictionary<string, CancellationTokenSource> Cancelations { get; }
    public ICache Cache { get; }

    private readonly ICacheNotify<DistributedTaskCancelation> _cancelTaskNotify;
    private readonly ICacheNotify<DistributedTaskCache> _taskCacheNotify;

    public DistributedTaskCacheNotify(
        ICacheNotify<DistributedTaskCancelation> cancelTaskNotify,
        ICacheNotify<DistributedTaskCache> taskCacheNotify,
        ICache cache)
    {
        Cancelations = new ConcurrentDictionary<string, CancellationTokenSource>();

        Cache = cache;

        _cancelTaskNotify = cancelTaskNotify;

        cancelTaskNotify.Subscribe((c) =>
        {
            if (Cancelations.TryGetValue(c.Id, out var s))
            {
                s.Cancel();
            }
        }, CacheNotifyAction.Remove);

        _taskCacheNotify = taskCacheNotify;

        taskCacheNotify.Subscribe((c) =>
        {
            Cache.HashSet(c.Key, c.Id, (DistributedTaskCache)null);
        }, CacheNotifyAction.Remove);

        taskCacheNotify.Subscribe((c) =>
        {
            Cache.HashSet(c.Key, c.Id, c);
        }, CacheNotifyAction.InsertOrUpdate);
    }

    public void CancelTask(string id)
    {
        _cancelTaskNotify.Publish(new DistributedTaskCancelation() { Id = id }, CacheNotifyAction.Remove);
    }

    public async Task CancelTaskAsync(string id)
    {
        await _cancelTaskNotify.PublishAsync(new DistributedTaskCancelation() { Id = id }, CacheNotifyAction.Remove);
    }

    public void SetTask(DistributedTask task)
    {
        _taskCacheNotify.Publish(task.DistributedTaskCache, CacheNotifyAction.InsertOrUpdate);
    }

    public async Task SetTaskAsync(DistributedTask task)
    {
        await _taskCacheNotify.PublishAsync(task.DistributedTaskCache, CacheNotifyAction.InsertOrUpdate);
    }

    public void RemoveTask(string id, string key)
    {
        _taskCacheNotify.Publish(new DistributedTaskCache() { Id = id, Key = key }, CacheNotifyAction.Remove);
    }

    public async Task RemoveTaskAsync(string id, string key)
    {
        await _taskCacheNotify.PublishAsync(new DistributedTaskCache() { Id = id, Key = key }, CacheNotifyAction.Remove);
    }
}

[Singletone(typeof(ConfigureDistributedTaskQueue))]
public class DistributedTaskQueueOptionsManager : OptionsManager<DistributedTaskQueue>
{
    public DistributedTaskQueueOptionsManager(IOptionsFactory<DistributedTaskQueue> factory) : base(factory) { }

    public DistributedTaskQueue Get<T>() where T : DistributedTask
    {
        return Get(typeof(T).FullName);
    }
}

[Scope]
public class ConfigureDistributedTaskQueue : IConfigureNamedOptions<DistributedTaskQueue>
{
    private readonly DistributedTaskCacheNotify _distributedTaskCacheNotify;
    public readonly IServiceProvider _serviceProvider;

    public ConfigureDistributedTaskQueue(
        DistributedTaskCacheNotify distributedTaskCacheNotify,
        IServiceProvider serviceProvider)
    {
        _distributedTaskCacheNotify = distributedTaskCacheNotify;
        _serviceProvider = serviceProvider;
    }

    public void Configure(DistributedTaskQueue queue)
    {
        queue.DistributedTaskCacheNotify = _distributedTaskCacheNotify;
        queue.ServiceProvider = _serviceProvider;
    }

    public void Configure(string name, DistributedTaskQueue options)
    {
        Configure(options);
        options.Name = name;
    }
}

public class DistributedTaskQueue
{
    public IServiceProvider ServiceProvider { get; set; }
    public DistributedTaskCacheNotify DistributedTaskCacheNotify { get; set; }
    public string Name
    {
        get => _name;
        set => _name = value + GetType().Name;
    }
    public int MaxThreadsCount
    {
        set => Scheduler = value <= 0
                ? TaskScheduler.Default
                : new ConcurrentExclusiveSchedulerPair(TaskScheduler.Default, value).ConcurrentScheduler;
    }

    private ICache Cache => DistributedTaskCacheNotify.Cache;
    private TaskScheduler Scheduler { get; set; } = TaskScheduler.Default;

    public static readonly int InstanceId = Process.GetCurrentProcess().Id;
    private string _name;

    private ConcurrentDictionary<string, CancellationTokenSource> Cancelations
    {
        get
        {
            return DistributedTaskCacheNotify.Cancelations;
        }
    }

    public void QueueTask(DistributedTaskProgress taskProgress)
    {
        QueueTask((a, b) => taskProgress.RunJob(), taskProgress);
    }

    public void QueueTask(Action<DistributedTask, CancellationToken> action, DistributedTask distributedTask = null)
    {
        if (distributedTask == null)
        {
            distributedTask = new DistributedTask();
        }

        distributedTask.InstanceId = InstanceId;

        var cancelation = new CancellationTokenSource();
        var token = cancelation.Token;
        Cancelations[distributedTask.Id] = cancelation;

        var task = new Task(() => { action(distributedTask, token); }, token, TaskCreationOptions.LongRunning);

        task.ConfigureAwait(false)
            .GetAwaiter()
            .OnCompleted(() => OnCompleted(task, distributedTask.Id));

        distributedTask.Status = DistributedTaskStatus.Running;

        if (distributedTask.Publication == null)
        {
            distributedTask.Publication = GetPublication();
        }

        distributedTask.PublishChanges();

        task.Start(Scheduler);
    }

    public void QueueTask(Func<DistributedTask, CancellationToken, Task> action, DistributedTask distributedTask = null)
    {
        if (distributedTask == null)
        {
            distributedTask = new DistributedTask();
        }

        distributedTask.InstanceId = InstanceId;

        var cancelation = new CancellationTokenSource();
        var token = cancelation.Token;
        Cancelations[distributedTask.Id] = cancelation;

            var task = new Task(() =>
        {
            var t = action(distributedTask, token);
            t.ConfigureAwait(false)
            .GetAwaiter()
            .OnCompleted(() => OnCompleted(t, distributedTask.Id));
        }, token, TaskCreationOptions.LongRunning);

            task.ConfigureAwait(false);

        distributedTask.Status = DistributedTaskStatus.Running;

        if (distributedTask.Publication == null)
        {
            distributedTask.Publication = GetPublication();
        }
        distributedTask.PublishChanges();

        task.Start(Scheduler);
    }

    public IEnumerable<DistributedTask> GetTasks()
    {
        var tasks = Cache.HashGetAll<DistributedTaskCache>(_name).Values.Select(r => new DistributedTask(r)).ToList();

        tasks.ForEach(t =>
        {
            if (t.Publication == null)
            {
                t.Publication = GetPublication();
            }
        });

        return tasks;
    }

    public IEnumerable<T> GetTasks<T>() where T : DistributedTask
    {
        var tasks = Cache.HashGetAll<DistributedTaskCache>(_name).Values.Select(r =>
        {
            var result = ServiceProvider.GetService<T>();
            result.DistributedTaskCache = r;

            return result;
        }).ToList();

        tasks.ForEach(t =>
        {
            if (t.Publication == null)
            {
                t.Publication = GetPublication();
            }
        });

        return tasks;
    }

    public T GetTask<T>(string id) where T : DistributedTask
    {
        var cache = Cache.HashGet<DistributedTaskCache>(_name, id);
        if (cache != null)
        {
            using var scope = ServiceProvider.CreateScope();
            var task = scope.ServiceProvider.GetService<T>();
            task.DistributedTaskCache = cache;
            if (task.Publication == null)
            {
                task.Publication = GetPublication();
            }

            return task;
        }

        return null;
    }

    public DistributedTask GetTask(string id)
    {
        var cache = Cache.HashGet<DistributedTaskCache>(_name, id);
        if (cache != null)
        {
            var task = new DistributedTask();
            task.DistributedTaskCache = cache;
            if (task.Publication == null)
            {
                task.Publication = GetPublication();
            }

            return task;
        }

        return null;
    }

    public void SetTask(DistributedTask task)
    {
        DistributedTaskCacheNotify.SetTask(task);
    }

    public void RemoveTask(string id)
    {
        DistributedTaskCacheNotify.RemoveTask(id, _name);
    }

    public void CancelTask(string id)
    {
        DistributedTaskCacheNotify.CancelTask(id);
    }

    private void OnCompleted(Task task, string id)
    {
        var distributedTask = GetTask(id);
        if (distributedTask != null)
        {
            distributedTask.Status = DistributedTaskStatus.Completed;
            distributedTask.Exception = task.Exception;

            if (task.IsFaulted)
            {
                distributedTask.Status = DistributedTaskStatus.Failted;
            }

            if (task.IsCanceled)
            {
                distributedTask.Status = DistributedTaskStatus.Canceled;
            }

            Cancelations.TryRemove(id, out _);

            distributedTask.PublishChanges();
        }
    }

    private Action<DistributedTask> GetPublication()
    {
        return (t) =>
        {
            if (t.DistributedTaskCache != null)
            {
                t.DistributedTaskCache.Key = _name;
            }

            DistributedTaskCacheNotify.SetTask(t);
        };
    }
}

public static class DistributedTaskQueueExtention
{
    public static DIHelper AddDistributedTaskQueueService<T>(this DIHelper services, int maxThreadsCount) where T : DistributedTask
    {
        services.TryAdd<DistributedTaskCacheNotify>();
        services.TryAdd<DistributedTaskQueueOptionsManager>();
        services.TryAdd<DistributedTaskQueue>();

        var type = typeof(T);

        if (!type.IsAbstract)
        {
            services.TryAdd<T>();
        }

        services.TryAddSingleton<IConfigureOptions<DistributedTaskQueue>, ConfigureDistributedTaskQueue>();

        _ = services.Configure<DistributedTaskQueue>(type.Name, r =>
        {
            r.MaxThreadsCount = maxThreadsCount;
            //r.errorCount = 1;
        });

        return services;
    }
}