using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;

namespace Provoke.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetUserById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT id, firstName, lastName,                        userName, email, normalMode
                                      FROM[User]
                                      WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        User user = new User
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            firstName = reader.GetString(reader.GetOrdinal("firstName")),
                            lastName = reader.GetString(reader.GetOrdinal("lastName")),
                            userName = reader.GetString(reader.GetOrdinal("userName")),
                            email = reader.GetString(reader.GetOrdinal("email")),
                            normalMode = reader.GetBoolean(reader.GetOrdinal("normalMode"))
                        };

                        reader.Close();
                        return user;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }

        }
    }
}
