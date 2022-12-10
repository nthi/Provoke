using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;
using Azure;
using Microsoft.Extensions.Hosting;
using Provoke.Utils;
using Microsoft.AspNetCore.Authentication.Cookies;
using Azure.Identity;
using System.Threading.Tasks.Dataflow;

namespace Provoke.Repositories
{
    public class PlaceholderRepository : BaseRepository, IPlaceholderRepository
    {
        public PlaceholderRepository(IConfiguration configuration) : base(configuration) { }
        public List<Placeholder> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, quote, author FROM Placeholder";
                    var reader = cmd.ExecuteReader();
                    List<Placeholder> placeholders = new List<Placeholder>();

                    while (reader.Read())
                    {
                        placeholders.Add(new Placeholder()
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            quote = reader.GetString(reader.GetOrdinal("quote")),
                            author = reader.GetString(reader.GetOrdinal("author"))
                        });
                    }
                    reader.Close();
                    return placeholders;
                }
            }
        }
    }

}
