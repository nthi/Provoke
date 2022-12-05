using Provoke.Models;

namespace Provoke.Repositories
{
    public interface IUserRepository
    {
        User GetUserById(int id);
    }
}