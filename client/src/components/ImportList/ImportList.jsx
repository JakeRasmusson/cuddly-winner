import React, { useRef, useState } from 'react'

const ImportList = ({onPlayersImported, team}) => {
    const fileInputRef = useRef(null)
    const [fileContent, setFileContent] = useState(null)

    const handleFileSelection = e => {
        const file = e.target.files[0]

        if(file) {
            console.log('File selected: ', file)
            readFile(file)
        }
    }

    const readFile = file => {
        const reader = new FileReader()

        reader.onload = _ => {
            const fileContents = reader.result
            console.log('File contents: ', fileContents)

            setFileContent(parseCSV(fileContents))

            onPlayersImported(Object.values(parseCSV(fileContents)), team)
        }

        reader.onerror = error => {
            console.error('Error reading file:', error)
        }

        reader.readAsText(file)
    }

    const handleImportClick = _ => {
        fileInputRef.current.click()
    }

    const parseCSV = csvText => {
        const lines = csvText.split`\n`
        //const headers = lines[0].split`,`

        let players = []

        for(let line of lines){
            let curLine = line.replace(/\"/g, '').split(`,`)

            if(!isNaN(parseInt(curLine[0]))){
                players.push(curLine)
            }
        }

        let obj = {}

        players.forEach(player => {
            obj[player[1]] = {
                name: player[1],
                number: player[0],
                position: player[2],
                grade: player[3],
                height: player[4],
                weight: player[5]
            }
        })

        return obj
    }

    return (
        <div>
            <button onClick={handleImportClick}>Import {team}</button>

            <input
                ref={fileInputRef}
                type='file'
                hidden
                onChange={handleFileSelection}
                accept={'.csv'}
            />

            {/*
            <div>
                {fileContent && (
                    <pre>
                        {JSON.stringify(fileContent, 2, null)}
                    </pre>
                )}
            </div>
            */}
            
        </div>
    )
}

export default ImportList