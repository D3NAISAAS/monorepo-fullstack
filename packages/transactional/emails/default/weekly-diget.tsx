// import { Body, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from '@react-email/components';



// const WeeklyDigestEmail = ({

//   company = 'ACME',

// }: WeeklyDigestEmailProps) => {

//   const previewText = `Weekly digest from ${company} `;


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

//                 alt="Logo example"

//                 className="my-0 mx-auto"

//               />

//             </Section>

//             <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">

//               Weekly Digest for you from <strong>{company}</strong>

//             </Heading>




//             {/* Each Article as a Row */}

//             <Row>

//               <Column>

//                 <Img

//                   src={`${baseUrl}/static/email-content-1.jpg`}

//                   width="110"

//                   height="110"

//                   alt="Article Thumbnail"

//                   className='rounded-2xl mr-5'

//                 />

//               </Column>

//               <Column>

//                 <Text className="text-sm">

//                   <strong>Understanding Photosynthesis: A Deep Dive:</strong> Photosynthesis is a crucial process for life on Earth. Understand how plants convert light energy into chemical energy, and the impact of this process on our daily lives

//                   <Link

//                     href={`#`}

//                     className="text-blue-600 no-underline pl-2"

//                   >

//                     Read More

//                   </Link>

//                 </Text>

//               </Column>

//             </Row>


//             <Row>

//               <Column>

//                 <Img

//                   src={`${baseUrl}/static/email-content-2.jpg`}

//                   width="110"

//                   height="110"

//                   alt="Article Thumbnail"

//                   className='rounded-2xl mr-5'

//                 />

//               </Column>

//               <Column>

//                 <Text className="text-sm">

//                   <strong>The Benefits of Indoor Plants</strong> Learn about the numerous benefits of having indoor plants, from improving air quality to boosting mood and productivity. Discover the best indoor plants for your home or office.

//                   <Link

//                     href={`#`}

//                     className="text-blue-600 no-underline pl-2"

//                   >

//                     Read More

//                   </Link>

//                 </Text>

//               </Column>

//             </Row>


//             <Row>

//               <Column>

//                 <Img

//                   src={`${baseUrl}/static/email-content-3.jpg`}

//                   width="110"

//                   height="110"

//                   alt="Article Thumbnail"

//                   className='rounded-2xl mr-5'

//                 />

//               </Column>

//               <Column>

//                 <Text className="text-sm">

//                   <strong>The Future of Plant-Based Foods:</strong> Plant-based foods are gaining popularity for their health and environmental benefits. Explore the future trends of this growing industry and how it could revolutionize our food system.

//                   <Link

//                     href={`#`}

//                     className="text-blue-600 no-underline pl-2"

//                   >

//                     Read More

//                   </Link>

//                 </Text>

//               </Column>

//             </Row>


//             <Hr className="border border-solid border-[#eaeaea] my-6 mx-0 w-full" />


//             <Text className="text-sm">

//               You can unsubscribe from these emails or update your email preferences {" "}

//               <Link

//                 href={`#`}

//                 className="text-blue-600 no-underline"

//               >

//                 here.

//               </Link>

//             </Text>

//           </Container>

//         </Body>

//       </Tailwind>

//     </Html>

//   );

// };


// interface WeeklyDigestEmailProps {

//   company?: string;

// }


// const baseUrl = process.env.URL

//   ? `https://${process.env.URL}`

//   : '';


// export default WeeklyDigestEmail;