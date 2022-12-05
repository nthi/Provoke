using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;

namespace Provoke.Repositories
{
    public class PlaceholderRepository: BaseRepository
    {
        public PlaceholderRepository(IConfiguration configuration) : base(configuration) { }
    }
}
