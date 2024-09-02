// export const Users: FC<UserProps> = () => {

//   return (
//     <>
//       <Container className={classes.tableContainer} sx={{}}>
//         <Table sx={{ borderRadius: 10 }}>
//           <TableHead
//             sx={{ backgroundColor: "rgba(14, 12, 21, 1)", display: "flex" }}
//           >
//             {tableHeadData.map((data: string, index: number) => {
//               return (
//                 <TableRow>
//                   <TableCell className={classes.tableCell} variant="head">
//                     <TableSortLabel
//                       className={classes.sortedTitle}
//                       active={
//                         orderBy === tableHeadKeys[index] && data !== "Действия"
//                       }
//                       direction={
//                         orderBy === tableHeadKeys[index] ? order : "asc"
//                       }
//                       onClick={() =>
//                         data !== "Действия" && handleRequestSort(index)
//                       }
//                     >
//                       {data}
//                     </TableSortLabel>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableHead>
//           <TableBody sx={{ display: "flex", flexDirection: "column" }}>
//             {sortedData.map((row) => (
//               <TableRow
//                 key={`table-${row.id}`}
//                 sx={{ cursor: "pointer" }}
//                 onClick={() => {
//                   logsForTarget(row);
//                   setDrawerActive(true);
//                 }}
//               >
//                 <TableCell
//                   className={classes.tableBody}
//                   key={`email-${row.id}`}
//                   variant="body"
//                 >
//                   {row.email}
//                 </TableCell>

//                 <TableCell
//                   className={classes.tableBody}
//                   key={`name-${row.id}`}
//                   variant="body"
//                 >
//                   {row.name}
//                 </TableCell>

//                 <TableCell
//                   className={classes.tableBody}
//                   key={`role-${row.id}`}
//                   variant="body"
//                 >
//                   {row.role}
//                 </TableCell>

//                 <TableCell
//                   className={classes.tableBody}
//                   key={`subscription-${row.id}`}
//                   variant="body"
//                 >
//                   {row.subscription.plan.type}
//                 </TableCell>

//                 <TableCell
//                   className={classes.tableBody}
//                   key={`tokens-${row.id}`}
//                   variant="body"
//                 >
//                   {row.subscription.tokens} TKN
//                 </TableCell>

//                 <TableCell
//                   className={classes.tableBody}
//                   key={`action-${row.id}`}
//                   variant="body"
//                 ></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Container>

//     </>
//   );
// };
