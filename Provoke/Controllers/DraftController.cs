using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Provoke.Models;
using Provoke.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Provoke.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DraftController : ControllerBase
    {
        private readonly IDraftRepository _draftRepository;
        public DraftController(IDraftRepository draftRepository)
        {
            _draftRepository = draftRepository;
        }
        // GET: api/<DraftController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET published drafts by user id
        //specify a specific route for this and the unpublished list
        //looks like I can add to HttpGet or add another set of brackets with [Route("api/[controller]/[action]")] info Or [Route("GetPublishedById")] or similar.
        [HttpGet("getpublished/{id}")]
        public IActionResult GetPublishedByUser(int id)
        {
            return Ok(_draftRepository.GetAllPublishedDraftsByUserId(id));
        }

        //GET unpublished drafts by user id
        [HttpGet("getunpublished/{id}")]
        public IActionResult GetUnpublishedByUser(int id)
        {
            return Ok(_draftRepository.GetAllUnpublishedDraftsByUserId(id));
        }

        //drafts are posting if i run sql query, but swagger gives me message "No route matches the supplied values" on created at action result.
        //in a previous similar issue, I simply hadn't set up what correlates to the "Get" in this example, BUT I'm not sure what I want to have there. I have two types of get already. I think I need to know what the reason for a CreatedAtAction is-- is it to get everything current after a POST?
        // POST api/<DraftController>
        [HttpPost]
        public IActionResult AddNewDraft(Draft draft)
        {
            _draftRepository.AddNewDraft(draft);
            return CreatedAtAction("Get", new { id = draft.id }, draft);
        }

        // PUT api/<DraftController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<DraftController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
