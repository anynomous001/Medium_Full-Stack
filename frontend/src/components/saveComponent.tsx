import { Button } from './ui/button'
import { BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { BACKEND_URL } from '@/config'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { saveState } from '@/recoil/atom'

const SaveComponent = () => {

    const [saveInfo, setSaveInfo] = useRecoilState(saveState)
    const { id } = useParams()
    console.log(saveInfo.hasSaved)
    const handleSave = async () => {
        axios.post(`${BACKEND_URL}/api/h1/blog/${id}/save-toggle`, {}, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setSaveInfo({ hasSaved: response.data.hasSaved })
            console.log(saveInfo)
        })
    }


    return (
        <Button
            onClick={handleSave}
            variant={'ghost'}
            size={'icon'}
        >
            <BookMarked
                className={cn("w-8 h-8",
                    saveInfo.hasSaved ? "text-slate-400/100 pointer-events-none" : "text-black"
                )}
                strokeWidth={1.5}

            />
        </Button>
    )
}

export default SaveComponent