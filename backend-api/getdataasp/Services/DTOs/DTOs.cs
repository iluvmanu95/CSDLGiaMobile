namespace GetDataAsp.Services.DTOs
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; } = true;
        public string? Message { get; set; }
        public T? Data { get; set; }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public object? User { get; set; }
        public string? Token { get; set; }
    }

    public class PagedResult<T>
    {
        public int CurrentPage { get; set; }
        public int PerPage { get; set; }
        public int Total { get; set; }
        public int LastPage { get; set; }
        public IEnumerable<T> Data { get; set; } = new List<T>();
    }
}
