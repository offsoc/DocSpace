﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace ASC.Data.Storage.Configuration
{
    public class Storage
    {
        public IEnumerable<Appender> Appender { get; set; }
        public IEnumerable<Handler> Handler { get; set; }
        public IEnumerable<Module> Module { get; set; }

        private static Storage instance;
        public static Storage Instance()
        {
            return instance ?? (instance = Common.Utils.ConfigurationManager.GetSetting<Storage>("Storage"));
        }

        public Module GetModuleElement(string name)
        {
            return Module?.FirstOrDefault(r => r.Name == name);
        }
        public Handler GetHandler(string name)
        {
            return Handler?.FirstOrDefault(r => r.Name == name);
        }
    }

    public class Appender
    {
        public string Name { get; set; }
        public string Append { get; set; }
        public string AppendSecure { get; set; }
        public string Extensions { get; set; }
    }

    public class Handler
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public IEnumerable<Properties> Property { get; set; }

        public IDictionary<string, string> GetProperties()
        {
            if (Property == null || !Property.Any()) return new Dictionary<string, string>();

            return Property.ToDictionary(r => r.Name, r => r.Value);
        }
    }
    public class Properties
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class Module
    {
        public string Name { get; set; }
        public string Data { get; set; }
        public string Type { get; set; }
        public string Path { get; set; }
        public ACL Acl { get; set; }
        public string VirtualPath { get; set; }
        public TimeSpan Expires { get; set; }
        public bool Visible { get; set; }
        public bool AppendTenantId { get; set; }
        public bool Public { get; set; }
        public bool DisableMigrate { get; set; }
        public bool Count { get; set; }

        public IEnumerable<Module> Domain { get; set; }
    }
}