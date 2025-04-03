using HoHDashboard.server.Models;
using HoHDashboard.server.Repository.IRepository;
using HoHDashboard.server.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace HoHDashboard.server.Repository
{
    public class CommonTypeRepository(ApplicationDbContext context) : ICommonTypeRepository
    {
        private readonly ApplicationDbContext _dbContext = context;
        public IEnumerable<UserLogin> GetUserList()
        {
            var list = _dbContext.UserLogins.ToList();
            return list;
        }
        public IEnumerable<BeneficiaryMaster> GetBeneficiaryList()
        {
            var list = _dbContext.BeneficiaryMasters.OrderBy(x => x.BeneficiaryName).Where(x => x.IsDeleted == false).ToList();
            return list;
        }
        public IEnumerable<FyYearSubsidyAmountViewModel> GetFyYearSubsidyAmount()
        {
            var res = _dbContext.Database.SqlQueryRaw<FyYearSubsidyAmountViewModel>("Exec Usp_GetFyYearSubsidyData").ToList();
            return res;
        }

        public string AddComponent(ComponentViewModel vmodel)
        {
            if (!String.IsNullOrWhiteSpace(vmodel.ComponentName) && !String.IsNullOrWhiteSpace(vmodel.ComponentCode))
            {
                var IsComponentExist = _dbContext.ComponentMasters.Where(x => x.ComponentName.ToLower().Trim() == vmodel.ComponentName.ToLower().Trim() && x.ComponentCode.ToLower().Trim() == vmodel.ComponentCode.ToLower().Trim() && x.IsDeleted == false).FirstOrDefault();
                if (IsComponentExist == null)
                {
                    ComponentMaster component = new()
                    {
                        ComponentName = vmodel.ComponentName,
                        ComponentCode = vmodel.ComponentCode,
                        CreatedDateTime = DateTime.Now,
                        IsDeleted = false
                    };
                    _dbContext.ComponentMasters.Add(component);
                    _dbContext.SaveChanges();
                    return "Component add successfully.";
                }
                return "Component name or code already exist.";
            }
            return "Component name or code should not be empty.";
        }

        public IEnumerable<ComponentMaster> ComponentList()
        {
            var data = _dbContext.ComponentMasters.OrderBy(x => x.CreatedDateTime).Where(x => x.IsDeleted == false).ToList();
            return data;
        }
    }
}