using Provoke.Models;
using System.Collections.Generic;

namespace Provoke.Repositories
{
    public interface IDraftRepository
    {
        List<Draft> GetAllPublishedDraftsByUserId(int id);
        List<Draft> GetAllUnpublishedDraftsByUserId(int id);
    }
}