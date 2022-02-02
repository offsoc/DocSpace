﻿using System;
using System.Collections.Generic;
using System.Linq;

using ASC.Common;
using ASC.Core;
using ASC.Core.Common.EF;
using ASC.Webhooks.Core.Dao;
using ASC.Webhooks.Core.Dao.Models;

namespace ASC.Webhooks.Core
{
    [Scope]
    public class DbWorker
    {
        private Lazy<WebhooksDbContext> _lazyWebhooksDbContext;
        private WebhooksDbContext WebhooksDbContext { get => _lazyWebhooksDbContext.Value; }
        private TenantManager _tenantManager { get; }

        public DbWorker(DbContextManager<WebhooksDbContext> webhooksDbContext, TenantManager tenantManager)
        {
            _lazyWebhooksDbContext = new Lazy<WebhooksDbContext>(() => webhooksDbContext.Value);
            _tenantManager = tenantManager;
        }

        public int WriteToJournal(WebhooksLog webhook)
        {
            var entity = WebhooksDbContext.WebhooksLogs.Add(webhook);
            WebhooksDbContext.SaveChanges();
            return entity.Entity.Id;
        }

        public WebhookEntry ReadFromJournal(int id)
        {
            return WebhooksDbContext.WebhooksLogs
                .Where(it => it.Id == id)
                .Join(WebhooksDbContext.WebhooksConfigs, t => t.ConfigId, t => t.ConfigId, (payload, config) => new { payload, config })
                .Select(t => new WebhookEntry { Id = t.payload.Id, Payload = t.payload.RequestPayload, SecretKey = t.config.SecretKey, Uri = t.config.Uri })
                .OrderBy(t => t.Id).FirstOrDefault();
        }

        public void AddWebhookConfig(WebhooksConfig webhooksConfig)
        {
            webhooksConfig.TenantId = _tenantManager.GetCurrentTenant().TenantId;

            var addObj = WebhooksDbContext.WebhooksConfigs.Where(it =>
            it.SecretKey == webhooksConfig.SecretKey &&
            it.TenantId == webhooksConfig.TenantId &&
            it.Uri == webhooksConfig.Uri).FirstOrDefault();

            if (addObj != null)
                return;

            WebhooksDbContext.WebhooksConfigs.Add(webhooksConfig);
            WebhooksDbContext.SaveChanges();
        }

        public void RemoveWebhookConfig(WebhooksConfig webhooksConfig)
        {
            webhooksConfig.TenantId = _tenantManager.GetCurrentTenant().TenantId;

            var removeObj = WebhooksDbContext.WebhooksConfigs.Where(it =>
            it.SecretKey == webhooksConfig.SecretKey &&
            it.TenantId == webhooksConfig.TenantId &&
            it.Uri == webhooksConfig.Uri).FirstOrDefault();

            WebhooksDbContext.WebhooksConfigs.Remove(removeObj);
            WebhooksDbContext.SaveChanges();
        }

        public void UpdateWebhookConfig(WebhooksConfig webhooksConfig)
        {
            webhooksConfig.TenantId = _tenantManager.GetCurrentTenant().TenantId;

            var updateObj = WebhooksDbContext.WebhooksConfigs.Where(it =>
            it.SecretKey == webhooksConfig.SecretKey &&
            it.TenantId == webhooksConfig.TenantId &&
            it.Uri == webhooksConfig.Uri).FirstOrDefault();

            WebhooksDbContext.WebhooksConfigs.Update(updateObj);
            WebhooksDbContext.SaveChanges();
        }

        public List<WebhooksConfig> GetWebhookConfigs(int tenant)
        {
            return WebhooksDbContext.WebhooksConfigs.Where(t => t.TenantId == tenant).ToList();
        }

        public void UpdateWebhookJournal(int id, ProcessStatus status, string responsePayload, string responseHeaders, string requestHeaders)
        {
            var webhook = WebhooksDbContext.WebhooksLogs.Where(t => t.Id == id).FirstOrDefault();
            webhook.Status = status;
            webhook.ResponsePayload = responsePayload;
            webhook.ResponseHeaders = responseHeaders;
            webhook.RequestHeaders = requestHeaders;
            WebhooksDbContext.WebhooksLogs.Update(webhook);
            WebhooksDbContext.SaveChanges();
        }

        public List<WebhooksLog> GetTenantWebhooks()
        {
            var tenant = _tenantManager.GetCurrentTenant().TenantId;
            return WebhooksDbContext.WebhooksLogs.Where(it => it.TenantId == tenant)
                    .Select(t => new WebhooksLog
                    {
                        Uid = t.Uid,
                        CreationTime = t.CreationTime,
                        RequestPayload = t.RequestPayload,
                        RequestHeaders = t.RequestHeaders,
                        ResponsePayload = t.ResponsePayload,
                        ResponseHeaders = t.ResponseHeaders,
                        Status = t.Status
                    }).ToList();
        }

        public int ConfigsNumber()
        {
            return WebhooksDbContext.WebhooksConfigs.Count();
        }
    }
}
