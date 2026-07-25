import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { Coins } from "lucide-react";
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';


function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openLogin, setOpenLogin] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const { userData } = useSelector(state => state.user)

    const logoutHandler = async()=>{
        try {
            await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}

                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 '>
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    <div className='flex items-center gap-2 cursor-pointer bg-white/5 p-2 px-4 rounded-2xl  border border-zinc-600 '>
                        <img src="robot1.png" alt="" className='h-10' />
                        <span className='font-semibold text-lg bg-linear-to-r  from-purple-400 to-indigo-500 bg-clip-text  text-transparent'> Infinity Ai</span>
                    </div>

                    {/* left side */}

                    <div className='flex items-center gap-5 '>
                        <button onClick={() => navigate('/pricing')}
                            className='hidden md:block text-sm cursor-pointer  text-zinc-400 hover:text-white transition '>
                            Pricing 
                        </button>

                        {/* credits */}

                        {userData && (
                            <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10  transition  '>
                                <Coins size={14} className=' text-yellow-400' />
                                <span className='text-white'>{userData.credits}</span>
                                <span className='text-zinc-200'>Credits</span>
                                <span className='text-zinc-200 font-semibold'>+</span>
                            </div>
                        )}

                        {/* profile or login */}

                        {
                            userData ? (
                                <div className='relative'>
                                    <button
                                        onClick={() => setOpenProfile(!openProfile)}

                                        className='flex items-center cursor-pointer'>
                                        <img referrerPolicy='no-refferer'
                                            src={userData ? userData.avatar : "https://ui-avatars.com/api/?name=Pratik+Sathe"} alt="" className='w-9 h-9 rounded-full border border-white/20 object-cover hove:scale-105 transition' />
                                    </button>
                                    <AnimatePresence>
                                        {openProfile && (
                                            <motion.div
                                            initial={{opacity:0, y:-10, scale:0.95}}
                                            animate={{opacity:1, y:0, scale:1}}
                                            exit={{opacity:0, y:-10, scale:0.95}}
                                            transition={{duration:0.2}}
                                            


                                                className='absolute  right-0 mt-3 w-60 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden   ' >
                                                <div className='px-4 py-3 border-b border-white/10 '>
                                                    <p className='text-sm font-medium truncate text-white '> {userData.name}</p>
                                                    <p className='text-xs font-medium truncate text-zinc-500 '> {userData.email}</p>
                                                </div>
                                                <button className='w-full px-4 py-3 text-center text-sm hover:bg-white/5 text-white cursor-pointer' onClick={()=>navigate("/dashboard")}>Dashboard</button>
                                                <button className='w-full px-4 py-3 text-center text-sm hover:bg-white/5 text-red-400 cursor-pointer'  onClick={logoutHandler}>Logout</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className='px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold text-sm transition text-white cursor-pointer '>
                                    Login
                                </button>
                            )
                        }

                    </div>


                </div>
            </motion.div>

            {openLogin && (
                <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
            )}
        </>
    )
}

export default Navbar