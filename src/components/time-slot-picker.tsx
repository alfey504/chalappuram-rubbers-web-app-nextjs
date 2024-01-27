"use client"

import { TimeSlot} from "@/utils/time-slot-manager"
import { ReactElement, useState } from "react"

export const TimeSlotPicker = ({
    timeSlots,
    className,
    name,
}:{
    timeSlots: TimeSlot[],
    className?: string,
    name?: string,
}): ReactElement => {

    const classes = (className == undefined) ? " " : className 
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    const inputName = (name == undefined) ? "": name

    const onSelect = (index: number) => {
        setSelectedIndex(index)
    }

    const value = function(): string{
        if(selectedIndex == undefined) { return "" } 
        return timeSlots[selectedIndex].time
    }()

    return (
        <div className={classes}>
            <input className=" hidden" type="datetime-locale" value={value} onChange={()=> {}} name={inputName} />
            <div className="flex flex-col 2xl:flex-row">
                {timeSlots.map(function(timeSlot, i){
                    return(<TimeSlotButton selectedIndex={selectedIndex} index={i} timeSlot={timeSlot} key={i} onSelect={onSelect} />)
                })}
            </div>
        </div>
    )
}

const TimeSlotButton = ({
    timeSlot,
    className,
    index,
    selectedIndex,
    onSelect
}:{
    timeSlot: TimeSlot,
    className?: string,
    index: number,
    selectedIndex: number | undefined,
    onSelect?: (index: number) => void
}) => {

    const classes = (className == undefined) ? " " : className
    const onSelection = (onSelect == undefined) ? (index: number) => {} : onSelect
    const isSelectedIndex = (selectedIndex == undefined || selectedIndex != index)
    
    const commonClasses = "flex items-center justify-center h-16 w-96 border-2 mb-2 2xl:w-28 2xl:mr-2 "
    const SelectButton = (): ReactElement => {
        if(timeSlot.available == true && isSelectedIndex){
            return(
                <div className={ commonClasses +  "bg-light-primary border-light-primary" } onClick={()=>{ onSelection(index) }}>
                    <span className=" text-light-primary">{timeSlot.time}</span>
                </div>
            )
        }else if(timeSlot.available == false){
            return (
                <div className={ commonClasses + "bg-slate-500 border-light-primary"}>
                    <span className=" text-light-primary">{timeSlot.time}</span>
                </div>
            )
        }else{
            return(
                <div className={ commonClasses + "bg-light-secondary border-light-primary"}>
                    <span className="text-light-secondary">{timeSlot.time}</span>
                </div>
            )
        }
    }
    
    return(
        <div className={classes}>
            <SelectButton />
        </div>
    )
}

