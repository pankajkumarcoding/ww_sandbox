import { gql } from 'apollo-boost';

/**
 * Cost of Living
 * Mutation: Add
 */
const addColDataMutation = gql`
    mutation(
        $f   : String!, $i  : String!, $s  : String!, 
        $col : Number!, $rv : Number!, $r0 : Number!, 
        $r1  : Number!, $r2 : Number!, $r3 : Number!, $r4 : Number!
    ) {
        addColData(f: $f, i: $i, s: $s, col: $col, rv: $rv, r0: $r0, r1: $r1, r2: $r2, r3: $r3, r4: $r4) {
            f
            i
            s
        }
    }
`;

/**
 * Cost of Living
 * Query: All
 */
const getAllColData = gql`
    {
        costs {
            f
            i
            s
            col
            rv
            r0
            r1
            r2
            r3
            r4
        }
    }
`;

/**
 * Cost of Living
 * Query: Single
 */
const getColData = gql`
    {
        query ($f : String) {
            cost(f : $f) {
                f
                i
                s
                col
                rv
                r0
                r1
                r2
                r3
                r4
            }
        }
    }
`;

export {getAllColData, addColDataMutation, getColData};