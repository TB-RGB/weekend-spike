import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux"


const ShowReport = ()=>{
    const history = useHistory()
    const reports = useSelector(store=>store.report)
    
   
    return(
        <>
        <h2>Report Data will go here</h2>
        <table>
            <thead>
                <tr>
                    <th>Band</th>
                    <th>Date</th>
                    <th>Door Time</th>
                    <th>Age Restriction</th>
                    <th>Total Tickets Sold</th>
                    <th>Total Presale</th>
                    <th>Total Beer</th>
                    <th>Total Liquor</th>
                    <th>Total Other</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report)=>
                    <tr key={report.id}>
                        <td>{report.band_id}</td>
                        <td>{report.show_date}</td>
                        <td>{report.door_time}</td>
                        <td>{report.age_restrictions}</td>
                        <td>{report.total_tickets_sold}</td>
                        <td>{report.total_presale_sold}</td>
                        <td>{report.total_beer_sold}</td>
                        <td>{report.total_liquor_sold}</td>
                        <td>{report.total_other_sold}</td>
                        <td> <button onClick={()=>history.push(`/update/${report.id}`)}>Update</button></td>
                    </tr>
                )}
            </tbody>
        </table>

        <h3>Chart here eventually</h3>
        </>
    )
}

export default ShowReport