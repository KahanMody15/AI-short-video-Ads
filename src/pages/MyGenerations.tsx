import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { PrimaryButton } from "../components/Buttons";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const MyGenerations = () => {
  const [generations, setGenerations] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchMyGenerations = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else if (data) {
      const formattedData: Project[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        userId: item.user_id,
        productName: item.product_name,
        productDescription: item.product_description,
        userPrompt: item.user_prompt,
        aspectRatio: item.aspect_ratio,
        targetLength: item.target_length,
        generatedImage: item.generated_image,
        generatedVideo: item.generated_video,
        isGenerating: item.is_generating,
        isPublished: item.is_published,
        error: item.error,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        uploadedImages: item.uploaded_images || [],
      }));
      setGenerations(formattedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchMyGenerations();
    } else {
      setLoading(false);
    }
  }, [user]);

  return loading? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon className="size-7 animate-spin text-indigo-400"/>
      {/* Your UI here */}
    </div>
  ) :(
    <div className="min-h-screen text-white p-6 md:p-12 my-28"> 
    <div className="max-w-6xl mx-auto">
<header className="mb-12">
<h1 className="text-3xl md:text-4xl font-semibold mb-4">My Generations</h1>
<p className="1t-gray-400"> view and page your AI-generated content </p>
</header>

{/* generation list */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
{generations.map((gen)=>(
< ProjectCard key ={gen. id} gen={gen} setGenerations={setGenerations} />
  ))}
</div>
{generations.length==0 &&(
  <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
    <h3 className="text-xl font-medium mb-2">No genetrations yet </h3>
    <p className="text-gray-400 mb-6">Start creating Stunning product photos today </p>
    <PrimaryButton onClick={()=>window.location.href ='/generate'}>
    Create New Generation
    </PrimaryButton>
  </div>
)}
</div>
</div>
  )}
export default MyGenerations;