using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using awillingham_site.Models;
using awillingham_site.Extensions;

namespace awillingham_site.Controllers
{
    public class SourceUpdatedController : Controller
    {
        private readonly ILogger<SourceUpdatedController> _logger;

        public SourceUpdatedController(ILogger<SourceUpdatedController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("sourceupdated")]
        public IActionResult SourceUpdated()
        {
            _logger.LogRequest("POST SourceUpdated", Request);
            return Ok();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
