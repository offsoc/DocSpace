﻿using System;

#nullable disable

namespace ASC.Webhooks.Dao.Models
{
    public partial class WebhooksPayload
    {
        public int Id { get; set; }
        public int ConfigId { get; set; }
        public int TenantId { get; set; }
        public string Data { get; set; }
        public DateTime CreationTime { get; set; }
        public string Event { get; set; }
        public ProcessStatus Status { get; set; }
    }
}
