using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;
using Microsoft.Extensions.Hosting;
using Provoke.Utils;
using Microsoft.AspNetCore.Authentication.Cookies;
using Azure.Identity;
using System.Threading.Tasks.Dataflow;
using Azure;

namespace Provoke.Repositories
{
    public class DraftRepository : BaseRepository, IDraftRepository
    {
        public DraftRepository(IConfiguration configuration) : base(configuration) { }

        //Creates a list of a single user's published posts
        public List<Draft> GetAllPublishedDraftsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT d.id AS draftId, d.userId, d.title, d.content, d.dateCreated, d.published, d.placeholderId, p.id AS phId, p.quote, p.author
                         FROM Draft d
							LEFT JOIN Placeholder p ON d.placeholderId = p.id
                        WHERE published = 1 AND d.userId = @userId
                        ORDER BY dateCreated DESC";
                    cmd.Parameters.AddWithValue("@userId", id);
                    var reader = cmd.ExecuteReader();

                    var drafts = new List<Draft>();

                    while (reader.Read())
                    {
                        var draftId = reader.GetInt32(reader.GetOrdinal("draftId"));


                        var existingDraft = drafts.FirstOrDefault(d => d.id == draftId);
                        if (existingDraft == null)
                        {
                            existingDraft = new Draft()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("draftId")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                title = reader.GetString(reader.GetOrdinal("title")),
                                content = reader.GetString(reader.GetOrdinal("content")),
                                dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                                published = reader.GetBoolean(reader.GetOrdinal("published")),
                                placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId")),
                                placeholder = new Placeholder()
                            };
                            drafts.Add(existingDraft);
                            if (existingDraft.placeholderId != 8)
                            {
                                existingDraft.placeholder.id = reader.GetInt32(reader.GetOrdinal("phId"));
                                existingDraft.placeholder.quote = reader.GetString(reader.GetOrdinal("quote"));
                                existingDraft.placeholder.author = reader.GetString(reader.GetOrdinal("author"));
                            }
                        }
                    }

                    reader.Close();

                    return drafts;
                }
            }
        }
        //if I want empty string when a nulled out placeholder quote/author, I might need to add an "else" to the conditionals in these two getby methods

        public List<Draft> GetAllUnpublishedDraftsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT d.id AS draftId, d.userId, d.title, d.content, d.dateCreated, d.published, d.placeholderId, p.id AS phId, p.quote, p.author
                         FROM Draft d
							LEFT JOIN Placeholder p ON d.placeholderId = p.id
                        WHERE published = 0 AND d.userId = @userId
                        ORDER BY dateCreated DESC";
                    cmd.Parameters.AddWithValue("@userId", id);
                    var reader = cmd.ExecuteReader();

                    var drafts = new List<Draft>();

                    while (reader.Read())
                    {
                        var draftId = reader.GetInt32(reader.GetOrdinal("draftId"));


                        var existingDraft = drafts.FirstOrDefault(d => d.id == draftId);
                        if (existingDraft == null)
                        {
                            existingDraft = new Draft()
                            {
                                id = reader.GetInt32(reader.GetOrdinal("draftId")),
                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                title = reader.GetString(reader.GetOrdinal("title")),
                                content = reader.GetString(reader.GetOrdinal("content")),
                                dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                                published = reader.GetBoolean(reader.GetOrdinal("published")),
                                placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId")),
                                placeholder = new Placeholder()
                            };
                            drafts.Add(existingDraft);
                            if (existingDraft.placeholderId != 8)
                            {
                                existingDraft.placeholder.id = reader.GetInt32(reader.GetOrdinal("phId"));
                                existingDraft.placeholder.quote = reader.GetString(reader.GetOrdinal("quote"));
                                existingDraft.placeholder.author = reader.GetString(reader.GetOrdinal("author"));
                            }
                        }
                    }
                    reader.Close();

                    return drafts;
                }
            }
        }
        // create an AddNewPublishedDraft and an AddNewUnpublishedDraft
        public void AddNewDraft(Draft draft)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                      INSERT INTO Draft
                                      (userId, title, content, dateCreated, published, placeholderId)
                                      OUTPUT INSERTED.ID
                                      VALUES (@userId,@title, @content, @dateCreated, @published, @placeholderId);";
                    cmd.Parameters.AddWithValue("@userId", draft.userId);
                    cmd.Parameters.AddWithValue("@title", draft.title);
                    cmd.Parameters.AddWithValue("@content", draft.content);
                    cmd.Parameters.AddWithValue("@dateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@published", draft.published);
                   cmd.Parameters.AddWithValue("@placeholderId", draft.placeholderId);
                    
                    draft.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Draft GetDraftById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, userId, title, content, dateCreated, published, placeholderId FROM Draft WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        Draft draft = new Draft
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            userId = reader.GetInt32(reader.GetOrdinal("userId")),
                            title = reader.GetString(reader.GetOrdinal("title")),
                            content = reader.GetString(reader.GetOrdinal("content")),
                            dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                            published = reader.GetBoolean(reader.GetOrdinal("published")),
                            placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId"))
                        };
                        reader.Close();
                        return draft;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
        public void Edit(Draft draft)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Draft
                                    SET
                                          title = @title,
                                          content = @content
                                    WHERE id = @id";

                    cmd.Parameters.AddWithValue("@title", draft.title);
                    cmd.Parameters.AddWithValue("@content", draft.content);
                    cmd.Parameters.AddWithValue("@id", draft.id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //Keeping just in case, probably not going to utilize this
        //private Draft NewDraftFromReader(SqlDataReader reader)
        //{
        //    return new Draft()
        //    {
        //        id = reader.GetInt32(reader.GetOrdinal("id")),
        //        userId = reader.GetInt32(reader.GetOrdinal("userId")),
        //        title = reader.GetString(reader.GetOrdinal("title")),
        //        content = reader.GetString(reader.GetOrdinal("content")),
        //        dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
        //        published = reader.GetBoolean(reader.GetOrdinal("published")),
        //        placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId")),

        //    };
        //}

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Draft
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
