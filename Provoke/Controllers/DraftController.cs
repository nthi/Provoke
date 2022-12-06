﻿using Microsoft.AspNetCore.Mvc;
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

        // POST api/<DraftController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

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