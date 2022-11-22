# template_monorepo_cross-platform

## API Setup

### Doppler
1. Install CLI
2. `doppler login`
3. `doppler setup`

### Supabase
1. Install CLI
2. `supabase login`
3. `supabase init`
4. `supabase start`
5. `supabase link`

## Database Migrations

### Prisma
Utilities:
1. `prisma db pull`: introspect DB
2. `prisma migrate dev --name <migration-name`: create and run migration

### Supabase
Utilities:
6. `supabase db remote commit` (pull changes)
7. `supabase db push` (push changes)
