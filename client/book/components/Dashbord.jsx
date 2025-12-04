
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
export default function Sidebar() {
    const [active, setActive] = useState('add');

    return (
       
      <aside className="w-56 bg-slate-900 text-slate-100 p-4 box-border flex flex-col gap-4 h-screen">
                <div className="flex items-center gap-3 p-2 rounded-md bg-white/5">
                    <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">
                        P
                    </div>
                    <div>
                        <div className="text-sm font-semibold">Profile</div>
                        <div className="text-xs text-slate-400">View & edit account</div>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 mt-2">
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${
                                isActive 
                                    ? 'bg-amber-400 text-slate-900'
                                    : 'text-slate-100 hover:bg-slate-800'
                            }`
                        }
                       
                    >
                        <span aria-hidden>👤</span>
                        <span>Profile</span>
                    </NavLink>

                    <NavLink
                        to="/add-book"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${
                                isActive 
                                    ? 'bg-amber-400 text-slate-900'
                                    : 'text-slate-100 hover:bg-slate-800'
                            }`
                        }
                    >
                        <span aria-hidden>📚</span>
                        <span>Add Book</span>
                    </NavLink>
                    <NavLink to="/Books" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md font-semibold ${
                        isActive ? 'bg-amber-400 text-slate-900' : 
                                'text-slate-100 hover:bg-slate-800'
                                }`}>

                        <span>Search Books</span>
                    </NavLink>
                </nav>
            </aside>

       
    );
}
