import type { Database } from './database';
import type { GetResult } from '@supabase/postgrest-js/dist/module/select-query-parser';

type Tables = Database['public']['Tables'];
type SplitRelStr_SuccessProps<T = keyof Tables, Q = string> = {
  table: T;
  query: Q;
};
type SplitRelStr<RelStr extends string> = RelStr extends `${infer T}(${infer Q})`
  ? T extends keyof Tables
    ? SplitRelStr_SuccessProps<T, Q>
    : { error: 'Parsed `RelationString`, but the table name does not exist.' }
  : { error: 'Cannot parse `RelationString`' };
type GetResolvedResult<SP extends SplitRelStr_SuccessProps> = GetResult<
  Database['public'],
  Tables[SP['table']]['Row'],
  SP['query']
>;

/**
 * @template RelStr Supabase relation string, e.g. `tablename(colum, another_colum)`.
 * @template RelType The type of relation. e.g. `one` or `many`. This decides if the returned relation is an array of objects/single object.
 */
export type ResolveRelationQuery<
    RelStr extends string,
    RelType extends 'one' | 'many' = 'many'
> = SplitRelStr<RelStr> extends SplitRelStr_SuccessProps
    ? {
        [K in SplitRelStr<RelStr>['table']]: RelType extends 'one'
            ? GetResolvedResult<SplitRelStr<RelStr>> | null
            : GetResolvedResult<SplitRelStr<RelStr>>[];
    }
    : { error: SplitRelStr<RelStr>['error'] };

/**
 * @template R { data } response you get from `const { data, error } = await supabase.from('tablename').select(...)`
 * @template RelObj Object that contains the table name and the resolved relation.
 */
export type ResolveArrayResponse<
  R extends any[],
  RelObj extends object
> = (R[0] & RelObj)[];
export type ResolveResponse<R extends any, RelObj extends object> = R & RelObj;

export type ArrayElement<T> = T extends readonly unknown[] ? T[0] : never;
export type Modify<T, R> = Omit<T, keyof R> & R;
