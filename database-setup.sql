-- Create repositories table
CREATE TABLE IF NOT EXISTS public.repositories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create repository_components table
CREATE TABLE IF NOT EXISTS public.repository_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    component JSONB NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security) for repositories
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own repositories" 
    ON public.repositories FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own repositories" 
    ON public.repositories FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own repositories" 
    ON public.repositories FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own repositories" 
    ON public.repositories FOR DELETE 
    USING (auth.uid() = user_id);

-- Set up RLS for repository_components
ALTER TABLE public.repository_components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own components" 
    ON public.repository_components FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own components" 
    ON public.repository_components FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own components" 
    ON public.repository_components FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own components" 
    ON public.repository_components FOR DELETE 
    USING (auth.uid() = user_id);
