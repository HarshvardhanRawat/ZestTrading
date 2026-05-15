import React from 'react';

function Team() {
    const teamMembers = [
        {
            name: "Jane Smith",
            role: "Systems Architect",
            desc: "Architecting the robust, scalable backend infrastructure that powers millions of secure transactions daily.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmC-mTIrI_KX3foSEFGZXJjndmFO290R_VyVSO4S1Lotqw7oX0_Ujrpx_c33VYy38vXVsZIPesJ4N9s0l9YrqRJreED54vj4o_2JnnPe_iZwdQlwT2QmhL4otSzDIMz5PBn6fBpU0v8zUEqbF7VreUui9kYvsO6Kv08N5rCjJjGpq7bdi6qfJ7TziTeIDkeEPWGx1QGdtLQRNuFAxcLNRQQylj5k9_9gi-0nrXySn8Phq2VvDf5uWEutOuY15YN4oYOvwdAEN-zFA"
        },
    ];

    return (
        <section className="team-section">
            <div className="team-header">
                <h2>Meet the Builders</h2>
                <p>Our team combines product-led thinking, market expertise, and engineering rigor to make investing more accessible.</p>
            </div>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <article key={index} className="team-card">
                        <div className="team-image-wrapper">
                            <img alt={member.name} className="team-image" src={member.img} />
                        </div>
                        <div className="team-card-body">
                            <h3>{member.name}</h3>
                            <p className="team-role">{member.role}</p>
                            <p className="team-desc">{member.desc}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Team;
