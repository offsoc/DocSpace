﻿#nullable disable

namespace ASC.Webhooks.Dao.Models
{
    public partial class WebhooksConfig
    {
        public int ConfigId { get; set; }
        public int TenantId { get; set; }
        public string Uri { get; set; }
        public string SecretKey { get; set; }
    }
}
