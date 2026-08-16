export interface Study {
	institution: string;
	credential: string;
	start: string;
	end: string;
	startISO: string;
	endISO: string;
	location: string;
	detail?: string;
}

export const EDUCATION: Study[] = [
	{
		institution: 'S.S. Jain Subodh PG College',
		credential: 'Bachelor of Computer Applications (BCA)',
		start: 'August 2024',
		end: 'June 2027',
		startISO: '2024-08-01',
		endISO: '2027-06-30',
		location: 'Jaipur, Rajasthan',
		detail:
			'Coursework: DBMS, Operating Systems, Computer Networking, Data Structures, Algorithms.',
	},
	{
		institution: 'KPS Udaan',
		credential: 'Grade 12 — Physics, Chemistry, Mathematics',
		start: 'April 2023',
		end: 'May 2024',
		startISO: '2023-04-01',
		endISO: '2024-05-31',
		location: 'Jaipur, Rajasthan',
		detail: 'Scored 90.2%.',
	},
];
