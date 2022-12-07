using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;
using Provoke.Utils;

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
                                      SELECT id, firstName, lastName, userName, email, normalMode
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
        //get by email method TODO: endpoint in controller
        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      SELECT id, firstName, lastName, userName, email, normalMode
                                      FROM[User]
                                      WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            userName = DbUtils.GetString(reader, "userName"),
                            email = DbUtils.GetString(reader, "email"),
                            normalMode = reader.GetBoolean(reader.GetOrdinal("normalMode")),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void AddUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (firstName, lastName, userName, email, normalMode)
                   OUTPUT INSERTED.ID
                   VALUES (@firstName, @lastName,  @userName, @email,  0)";
                    DbUtils.AddParameter(cmd, "@firstName", user.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", user.lastName);
                    DbUtils.AddParameter(cmd, "@userName", user.userName);
                    DbUtils.AddParameter(cmd, "@email", user.email);
                    DbUtils.AddParameter(cmd, "@normalMode", 0);


                    user.id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void UpdateUser(int id, User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE [User]
                                    SET
                                          firstName = @firstName,
											lastName = @lastName,
											userName = @userName,
                                            normalMode = @normalMode
                                    WHERE id = @id";

                    cmd.Parameters.AddWithValue("@firstName", user.firstName);
                    cmd.Parameters.AddWithValue("@lastName", user.lastName);
                    cmd.Parameters.AddWithValue("@userName", user.userName);
                    cmd.Parameters.AddWithValue("@normalMode", user.normalMode);

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM [User] WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
