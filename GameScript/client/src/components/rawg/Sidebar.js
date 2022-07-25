import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Button, Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = ({gamesByGenre, gamesByPlatform, gamesTopRated, gamesUpcoming}) => {


    const genreInputChange = (event) => {
        let genre = event.target.value
        return gamesByGenre(genre)
    }

    const platformInputChange = (event) => {
        let platform = event.target.value
        return gamesByPlatform(platform)
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem>
                            <Button onClick={gamesTopRated}>Top Rated</Button>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem>
                            <Button onClick={gamesUpcoming}>Upcoming</Button>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem>
                            <select name="genres" id="genre_dropdown" onChange={genreInputChange}>
                                <option value="---">Choose a Genre</option>
                                <option value="4">Action</option>
                                <option value="3">Adventure</option>
                                <option value="51">Indie</option>
                                <option value="5">RPG</option>
                                <option value="10">Strategy</option>
                                <option value="2">Shooter</option>
                                <option value="40">Casual</option>
                                <option value="14">Simulation</option>
                                <option value="7">Puzzle</option>
                                <option value="11">Arcade</option>
                                <option value="83">Platformer</option>
                                <option value="1">Racing</option>
                                <option value="59">MMO</option>
                                <option value="15">Sports</option>
                                <option value="6">Fighting</option>
                            </select>
                        </CDBSidebarMenuItem>
                        <CDBSidebarMenuItem>
                            <select name="platforms" id="platform_dropdown" onChange={platformInputChange}>
                                <option value="---">Choose a Platform</option>
                                <option value="4">PC</option>
                                <option value="5">Mac</option>
                                <option value="6">Linux</option>
                                <option value="187">PS5</option>
                                <option value="186">Series X/S</option>
                                <option value="7">Switch</option>
                                <option value="18">PS4</option>
                                <option value="1">Xbox One</option>
                                <option value="8">3DS</option>
                            </select>
                        </CDBSidebarMenuItem>
                    
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 5px',
                    }}
                    >
                    Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
};

export default Sidebar;