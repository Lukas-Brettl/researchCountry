
export default function ComboBox(props){

    function processing(info) {
        return info.map(([key, value], index) => (
            <li key={key} onClick={() => props.onItemClick(index)} className="flex text-lg  items-center p-1 cursor-pointer">
                <span className="w-10 overflow-hidden mr-2">
                    <img src={value} alt={`flag of ${key}`} className="h-7 "/>
                </span>
                
                <h4 className="">{key}</h4>
            </li>
        ));
    }
    
    return(
        <ul className="flex absolute flex-col gap-3 mt-2 p-2 bg-white w-80 border-slate-500 border-2 rounded-lg">
            {processing(Object.entries(props.info))}
        </ul>
    )
}