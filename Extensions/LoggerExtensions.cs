using System;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace awillingham_site.Extensions
{
    public static class LoggerExtensions
    {
        public static void LogRequest(this ILogger logger, string message, HttpRequest request)
        {
            var ip = request.HttpContext.Connection.RemoteIpAddress;
            var time = DateTime.UtcNow.ToLongTimeString();
            var msg = $"{time}: ({ip}) {message}";
            logger.LogInformation(msg);
        }
    }
}