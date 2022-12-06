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

namespace Provoke.Repositories
{
    public class DraftRepository : BaseRepository, IDraftRepository
    {
        public DraftRepository(IConfiguration configuration) : base(configuration) { }

        //for GetAllPublishedDraftsByUserId , getallunpublished, and add(newdraftfromreader), how do I incorporate quote and quote's author?
        //i'll have to do new draft from reader a different way, so I think I should refactor for expediency. just build the draft in these methods.
        //if I did use the newdfr I need conditionals if placeholder, then grab these things

        public List<Draft> GetAllPublishedDraftsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT d.id AS draftId, d.userId, d.title, d.content, d.dateCreated, d.published, d.placeholderId, p.quote, p.author
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


                                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                                title = reader.GetString(reader.GetOrdinal("title")),
                                content = reader.GetString(reader.GetOrdinal("content")),
                                dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                                published = reader.GetBoolean(reader.GetOrdinal("published")),
                                placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId")),
                                placeholder = new Placeholder()
                                //quote = reader.GetString(reader.GetOrdinal("quote")),
                                //author = reader.GetString(reader.GetOrdinal("author"))
                            };
                        drafts.Add(existingDraft);
                        if (DbUtils.IsNotDbNull(reader, "placeholderId"))
                        {
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

        public List<Draft> GetAllUnpublishedDraftsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT d.id, d.userId, d.title, d.content, d.dateCreated, d.published, p.quote, p.author
                         FROM Draft d
							LEFT JOIN Placeholder p ON d.placeholderId = p.id
                        WHERE published = 0 AND d.userId = @userId
                        ORDER BY dateCreated DESC";
                    var reader = cmd.ExecuteReader();

                    var drafts = new List<Draft>();

                    while (reader.Read())
                    {
                        Draft draft = new Draft()
                        {
                            id = reader.GetInt32(reader.GetOrdinal("id")),
                            userId = reader.GetInt32(reader.GetOrdinal("userId")),
                            title = reader.GetString(reader.GetOrdinal("title")),
                            content = reader.GetString(reader.GetOrdinal("content")),
                            dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                            published = reader.GetBoolean(reader.GetOrdinal("published")),
                            placeholder = new Placeholder()
                            //quote = reader.GetString(reader.GetOrdinal("quote")),
                            //author = reader.GetString(reader.GetOrdinal("author"))
                        };
                        if (DbUtils.IsNotDbNull(reader, "placeholderId"))
                        {
                            draft.placeholder.quote = reader.GetString(reader.GetOrdinal("quote"));
                            draft.placeholder.author = reader.GetString(reader.GetOrdinal("author"));
                        }
                    }

                    reader.Close();

                    return drafts;
                }
            }
        }

        // create an AddNewPublishedDraft and an AddNewUnpublishedDraft

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


    }
}
