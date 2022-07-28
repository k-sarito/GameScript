namespace GameScript.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public decimal UserPurchasePrice { get; set; }
        public string UserPlatform { get; set; }
        public int UserPlaytime { get; set; }
        public bool Completed { get; set; }
        public int Graphics { get; set; }
        public int Story { get; set; }
        public string Content { get; set; }
    }
}
