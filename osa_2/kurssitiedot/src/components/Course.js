import React from 'react'

const Header = ({ header }) => <div><h1>{header}</h1></div>
const Part = ({ part, exercises }) => <div><p>{part} {exercises}</p></div>
const Total = ({ total }) => <div><p>Yhteensä: {total} tehtävää</p></div>


const Course = ({courses}) => {
    

    const course = courses[0].parts
    console.log(course)
    //Ongelmana courses käsittely!!
    //const course = courses.map(i => i.parts)

    const rows = () => course.map(course =>
        <Part
            key={course.id}
            part={course.name}
            exercises={course.exercises}
        />

    )

    const count = course.map(t => t.exercises).reduce((s, p) => s + p)

    return (
        <div>
            <Header header={courses.name} />
            {rows()}
            <Total total={count} />
        </div>
    )
    

}

export default Course