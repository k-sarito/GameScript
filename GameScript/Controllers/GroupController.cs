using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using GameScript.Models;
using GameScript.Repositories;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace GameScript.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public GroupController(IGroupRepository groupRepository, IUserProfileRepository userProfileRepository)
        {
            _groupRepository = groupRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


        [HttpGet("Joined")]
        public IActionResult GetJoined()
        {
            var userProfileId = GetCurrentUserProfile().Id;
            return Ok(_groupRepository.GetAllByUserId(userProfileId));
        }

        [HttpGet("Unjoined")]
        public IActionResult GetUnjoined()
        {
            var userProfileId = GetCurrentUserProfile().Id;
            return Ok(_groupRepository.GetAllUnjoined(userProfileId));
        }

        [HttpPost("Create")]
        public IActionResult CreateGroup(Group group)
        {
            var userProfile = GetCurrentUserProfile();
            group.AdminId = userProfile.Id;
            _groupRepository.Add(group);
            return Ok(group);
        }

        [HttpPost("Join")]
        public IActionResult JoinGroup(int groupId)
        {
            var userProfileId = GetCurrentUserProfile().Id;
            _groupRepository.AddUser(groupId, userProfileId);
            return NoContent();
        }
    }

}
