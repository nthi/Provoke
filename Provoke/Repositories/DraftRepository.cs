using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Provoke.Models;
//using Provoke.Utils;
using System.Linq;
using Microsoft.Extensions.Hosting;

namespace Provoke.Repositories
{
    public class DraftRepository : BaseRepository, IDraftRepository
    {
        public DraftRepository(IConfiguration configuration) : base(configuration) { }

        public List<Draft> GetAllPublishedDrafts()
        {
            throw new NotImplementedException();
        }

        //for GetAllPublishedDraftsByUserId , getallunpublished, and add(newdraftfromreader), how do I incorporate quote and quote's author?
        //quote = reader.GetString(reader.GetOrdinal("quote")),
        //author = reader.GetString(reader.GetOrdinal("author"))
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
                       SELECT d.id, d.userId, d.title, d.content, d.dateCreated, d.published, p.quote, p.author
                         FROM Draft d
							LEFT JOIN Placeholder p ON d.placeholderId = p.id
                        WHERE published = 1 AND d.userId = @userId
                        ORDER BY dateCreated DESC";
                    var reader = cmd.ExecuteReader();

                    var drafts = new List<Draft>();

                    while (reader.Read())
                    {
                        drafts.Add(NewDraftFromReader(reader));
                    }

                    reader.Close();

                    return drafts;
                }
            }
        }

        public List<Draft> GetAllUnpublishedDrafts()
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
                        drafts.Add(NewDraftFromReader(reader));
                    }

                    reader.Close();

                    return drafts;
                }
            }
        }
        private Draft NewDraftFromReader(SqlDataReader reader)
        {
            return new Draft()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                title = reader.GetString(reader.GetOrdinal("title")),
                content = reader.GetString(reader.GetOrdinal("content")),
                dateCreated = reader.GetDateTime(reader.GetOrdinal("dateCreated")),
                published = reader.GetBoolean(reader.GetOrdinal("published")),
                placeholderId = reader.GetInt32(reader.GetOrdinal("placeholderId")),

            };
        }


    }
}
