using Provoke.Models;
using System.Collections.Generic;

namespace Provoke.Repositories
{
    public interface IDraftRepository
    {
        List<Draft> GetAllPublishedDrafts();
        List<Draft> GetAllUnpublishedDrafts();
    }
}