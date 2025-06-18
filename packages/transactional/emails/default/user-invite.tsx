// import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';

// import * as React from 'react';


// export const InviteUserEmail = ({

//   username = 'user',

//   userImage = `${baseUrl}/static/avatar.png`,

//   invitedByUsername = 'analasso',

//   invitedByEmail = 'analasso@gmail.com',

//   teamName = 'Project',

//   teamImage = `${baseUrl}/static/example-logo.png`,

//   inviteLink = 'https://company.com/teams/invite/foo',

//   inviteFromIp = '204.13.186.218',

//   inviteFromLocation = 'Greendale',

//   company = 'ACME',

// }: InviteUserEmailProps) => {

//   const previewText = `Join ${invitedByUsername}`;


//   return (

//     <Html>

//       <Head />

//       <Preview>{previewText}</Preview>

//       <Tailwind>

//         <Body className="bg-white my-auto mx-auto font-sans">

//           <Container className="my-10 mx-auto p-5 w-[465px]">

//             <Section className="mt-8">

//               <Img

//                 src={`${baseUrl}/static/example-logo.png`}

//                 width="80"

//                 height="80"

//                 alt="Logo Example"

//                 className="my-0 mx-auto"

//               />

//             </Section>

//             <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">

//               Join <strong>{teamName}</strong> on <strong>{company}</strong>

//             </Heading>

//             <Text className="text-sm">

//               Hello {username},

//             </Text>

//             <Text className="text-sm">

//               <strong>{invitedByUsername}</strong> (

//               <Link

//                 href={`mailto:${invitedByEmail}`}

//                 className="text-blue-600 no-underline"

//               >

//                 {invitedByEmail}

//               </Link>

//               ) has invited you to the <strong>{teamName}</strong> team on{' '}

//               <strong>{company}</strong>.

//             </Text>

//             <Section className="text-center my-8">

//               <Button

//                 pX={20}

//                 pY={12}

//                 className="bg-[#00A3FF] rounded-sm text-white text-[12px] font-semibold no-underline text-center"

//                 href={inviteLink}

//               >

//                 Join the team

//               </Button>

//             </Section>

//             <Text className="text-sm">

//               or copy and paste this URL into your browser:{' '}

//               <Link

//                 href={inviteLink}

//                 className="text-blue-600 no-underline"

//               >

//                 {inviteLink}

//               </Link>

//             </Text>

//             <Hr className="border border-solid border-[#eaeaea] my-6 mx-0 w-full" />

//             <Text className="opacity-50 text-xs">

//               This invitation was intended for{' '}

//               <span className="">{username} </span>.This invite was sent from{' '}

//               <span className="">{inviteFromIp}</span> located in{' '}

//               <span className="">{inviteFromLocation}</span>. If you were not

//               expecting this invitation, you can ignore this email. If you are

//               concerned about your account's safety, please reply to this email to

//               get in touch with us.

//             </Text>

//           </Container>

//         </Body>

//       </Tailwind>

//     </Html>

//   );

// };



// interface InviteUserEmailProps {

//   username?: string;

//   userImage?: string;

//   invitedByUsername?: string;

//   invitedByEmail?: string;

//   teamName?: string;

//   teamImage?: string;

//   inviteLink?: string;

//   inviteFromIp?: string;

//   inviteFromLocation?: string;

//   company?: string;

// }


// const baseUrl = process.env.URL

//   ? `https://${process.env.URL}`

//   : '';


// export default InviteUserEmail;