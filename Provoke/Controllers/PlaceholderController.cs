using Microsoft.AspNetCore.Mvc;
using Provoke.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Provoke.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceholderController : ControllerBase
    {
        private readonly IPlaceholderRepository _placeholderRepository;

        public PlaceholderController(IPlaceholderRepository placeholderRepository)
        {
            _placeholderRepository = placeholderRepository;
        }
        // GET: api/<PlaceholderController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_placeholderRepository.GetAll());
        }

        // GET api/<PlaceholderController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<PlaceholderController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<PlaceholderController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<PlaceholderController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
