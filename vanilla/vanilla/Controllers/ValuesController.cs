using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vanilla.Models;

namespace Vanilla.Controllers
{
    [Route("api/[controller]")]
    public class TrainingsController : Controller
    {
        IDatabase database;

        public TrainingsController(IDatabase database)
        {
            this.database = database;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Training> Get()
        {
            return database.Get();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
