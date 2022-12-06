using Provoke.Models;

namespace Provoke.Repositories
{
    public interface IUserRepository
    {
        public User GetUserById(int id);
        public void AddUser(User user);
    }
}