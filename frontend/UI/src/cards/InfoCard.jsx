const InfoCard = ({title, expenses}) => {
    return (
        <div className="info-card">
            <h3>{title} Expenses</h3>
            <p>{expenses} ALL</p>
        </div>
    )
}

export default InfoCard;