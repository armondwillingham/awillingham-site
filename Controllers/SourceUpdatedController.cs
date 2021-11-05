using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using awillingham_site.Models;
using awillingham_site.Extensions;
using awillingham_site.Config;

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
            _logger.LogRequest(_appOptionsMonitor.CurrentValue.GithubSecret, Request);
            return Ok();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
