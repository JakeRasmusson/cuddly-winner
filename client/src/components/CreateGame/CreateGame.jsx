import React, { useState } from 'react'


const CreateGame = ({ gameList }) => {

    

    return (

        <>
            <div className="flex flex-col w-1/2 p-2">
                <h1 className="text-[30px] font-extralight tracking-[12px] text-yellow-300 border-b-1">Create a Game</h1>
                <div className="grid content-center grid-cols-2 gap-y-5 pt-8">
                    
                    <label for="home" className="text-lg text-yellow-50 tracking-wider font-extralight">Home Team</label>
                    <input type="text" id="home" className="bg-black text-md border border-yellow-200 rounded-md p-1 w-50 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]" placeholder="Home Team" required />
                    
                    <label for="away" className="text-lg text-yellow-50 tracking-wider font-extralight">Visiting Team</label>
                    <input type="text" id="home" className="bg-black text-md border border-yellow-200 rounded-md p-1 w-50 text-center outline-none focus:shadow-[0_0_10px_rgb(250,204,21)]" placeholder="Visiting Team" required />

                    <label for="sport" className="text-lg text-yellow-50 tracking-wider font-extralight">Sport</label>
                    <select id="sport" className="block w-50 text-md text-yellow-200 bg-transparent border-0 border-b-2 border-yellow-200 outline-none appearance-none" style={{textAlignLast: "center"}}>
                        <option value='' disabled selected>Select a Sport</option>
                        <option value="basketball">Basketball</option>
                        <option value="baseball">Baseball</option>
                        <option value="softball">Softball</option>
                        <option value="football">Football</option>
                        <option value="soccer">Soccer</option>
                    </select>
                </div>
            </div>
        </>

    )
}

export default CreateGame