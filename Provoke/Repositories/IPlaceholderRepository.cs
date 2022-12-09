using Provoke.Models;
using System.Collections.Generic;

namespace Provoke.Repositories
{
    public interface IPlaceholderRepository
    {
        List<Placeholder> GetAll();
    }
}