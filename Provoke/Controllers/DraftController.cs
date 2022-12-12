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

        [HttpGet("getbyid/{id}")]
        public IActionResult GetDraftById(int id)
        {
            return Ok(_draftRepository.GetDraftById(id));
        }

        //if I'm just going to a list page with no details then return NoContent() instead of OK(...) or CreatedAtAction(...) is fine
        //don't forget to refresh list on client side
        // POST api/<DraftController>
        [HttpPost]
        public IActionResult AddNewDraft(Draft draft)
        {
            _draftRepository.AddNewDraft(draft);
            return NoContent();
        }

        // PUT api/<DraftController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Draft draft)
        {
            if (id != draft.id)
            {
                return BadRequest();
            }
            _draftRepository.Edit(draft);
            return NoContent();
        }

        // DELETE api/<DraftController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _draftRepository.Delete(id);
            return NoContent();
        }
    }
}
