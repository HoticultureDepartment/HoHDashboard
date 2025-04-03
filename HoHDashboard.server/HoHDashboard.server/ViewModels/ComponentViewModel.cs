namespace HoHDashboard.server.ViewModels
{
    public class ComponentViewModel
    {
        public string? ComponentName { get; set; }
        public string? ComponentCode { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
