using System;
using System.IO;
using System.Security.Cryptography;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using awillingham_site.Models;
using awillingham_site.Extensions;
using awillingham_site.Config;
using System.Text;

namespace awillingham_site.Controllers
{
    public class SourceUpdatedController : Controller
    {
        private readonly ILogger<SourceUpdatedController> _logger;
        private readonly IOptionsMonitor<AppOptions> _appOptionsMonitor;

        public SourceUpdatedController(
            ILogger<SourceUpdatedController> logger,
            IOptionsMonitor<AppOptions> appOptionsMonitor
            )
        {
            _logger = logger;
            _appOptionsMonitor = appOptionsMonitor;
        }

        [HttpPost]
        [Route("sourceupdated")]
        public IActionResult SourceUpdated()
        {   
            var streamReader = new StreamReader(Request.Body);
            var body = streamReader.ReadToEnd();
            var hash = GetHash(body, _appOptionsMonitor.CurrentValue.GithubSecret);
            _logger.LogRequest(hash, Request);
            
            return Ok();
        }

        private string GetHash(string text, string key)
        {
            // change according to your needs, an UTF8Encoding
            // could be more suitable in certain situations
            ASCIIEncoding encoding = new ASCIIEncoding();

            byte[] textBytes = encoding.GetBytes(text);
            byte[] keyBytes = encoding.GetBytes(key);

            byte[] hashBytes;

            using (HMACSHA256 hash = new HMACSHA256(keyBytes))
                hashBytes = hash.ComputeHash(textBytes);

            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
