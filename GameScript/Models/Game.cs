using System;

namespace GameScript.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RawgGameId { get; set; }
        public int PercentComplete { get; set; }
        public DateTime Released { get; set; }
        public string Image { get; set; }
        public decimal Rating { get; set; }
        public int Metacritic { get; set; }
        public int Playtime { get; set; }
        public string Name { get; set; }
        public string Esrb { get; set; }
        public string CurrentThoughts { get; set; }

    }
}
