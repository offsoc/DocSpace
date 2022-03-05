﻿global using System.Globalization;
global using System.Runtime.InteropServices;
global using System.Text;
global using System.Text.Json;
global using System.Text.Json.Serialization;
global using System.Text.RegularExpressions;
global using System.Web;

global using ASC.Api.Core;
global using ASC.Api.Documents;
global using ASC.Api.Utils;
global using ASC.Common;
global using ASC.Common.Logging;
global using ASC.Common.Utils;
global using ASC.Common.Web;
global using ASC.Core;
global using ASC.Core.Billing;
global using ASC.Core.Common.Configuration;
global using ASC.Core.Common.Settings;
global using ASC.Core.Users;
global using ASC.FederatedLogin.Helpers;
global using ASC.FederatedLogin.LoginProviders;
global using ASC.Files.Core;
global using ASC.Files.Core.Model;
global using ASC.Files.Core.Security;
global using ASC.Files.Helpers;
global using ASC.Files.Model;
global using ASC.MessagingSystem.Core;
global using ASC.Web.Api.Routing;
global using ASC.Web.Core.Files;
global using ASC.Web.Core.PublicResources;
global using ASC.Web.Core.Users;
global using ASC.Web.Files;
global using ASC.Web.Files.Classes;
global using ASC.Web.Files.Configuration;
global using ASC.Web.Files.Core.Compress;
global using ASC.Web.Files.Core.Entries;
global using ASC.Web.Files.Helpers;
global using ASC.Web.Files.HttpHandlers;
global using ASC.Web.Files.Services.DocumentService;
global using ASC.Web.Files.Services.WCFService;
global using ASC.Web.Files.Services.WCFService.FileOperations;
global using ASC.Web.Files.Utils;
global using ASC.Web.Studio.Core;
global using ASC.Web.Studio.Core.Notify;
global using ASC.Web.Studio.Utility;

global using Autofac.Extensions.DependencyInjection;

global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Extensions.Options;

global using Newtonsoft.Json.Linq;

global using static ASC.Api.Documents.FilesController;